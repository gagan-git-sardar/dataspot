import React, { useEffect, useRef, useState } from 'react'

import Ackley, { DOMAIN as ACKLEY_DOMAIN, GLOBAL_M as ACKLEY_GLOBAL_M } from '../../lib/dataset/benchmark/ackley'
import LinePlot from '../../lib/visualizations/d3/lineplot'
import Axis from '../../lib/visualizations/d3/axis'
import Scatter from '../../lib/visualizations/d3/scatter'
import SVGMultipleVisualization from '../../lib/visualizations/d3/svgmultiple'
import MeshPlot from '../../lib/visualizations/three/mesh'
import Sphere from '../../lib/visualizations/three/sphere'
import ThreeMultipleVisualization from '../../lib/visualizations/three/threemultiple'

import PSO, { PSOConfig } from '../../lib/metaheuristics/pso'
import FitnessFunction from '../../lib/metaheuristics/fitnessFunction'

function getData(ff: (x: number) => number, min = -1, max = 1, step = 0.01) {
    const data = []
    for (let i = min; i < max; i += step) {
        data.push([i, ff(i), 2])
    }

    return data
}

function Representation({
    ff,
    name,
    type,
    width,
    height,
    domain,
    globalM
}: {
    ff: (...input: number[]) => number
    type: string
    name: string
    width: number
    height: number
    domain: number[]
    globalM: number[]
}) {
    const containerRef = useRef<HTMLDivElement | null>(null)

    const twoDParticleEvolution = async (plot: SVGMultipleVisualization, scatterElemClass: string) => {
        let doneMetaheuristic = false
        let metaheuristicValue = []

        const pso = new PSO({ populationSize: 3 } as PSOConfig)
        const psoGenerator = pso.fitAsync(
            Object.assign(new FitnessFunction(), {
                function: ff,
                dimensions: [{ min: domain[0], max: domain[1] }]
            })
        )

        const snooze = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

        while (!doneMetaheuristic) {
            const regressionResult = psoGenerator.next()
            metaheuristicValue = regressionResult.value

            doneMetaheuristic = regressionResult.done || false
            plot.dataUpdate(
                // eslint-disable-next-line no-loop-func
                metaheuristicValue.map((position) => {
                    return { x: position[0], y: ff(position[0]), r: 3 }
                }),
                scatterElemClass
            )

            // eslint-disable-next-line no-await-in-loop
            await snooze(100)
        }
    }

    const twoDFunctionRepresentation = () => {
        const axisElemClass = 'axis-elem'
        const lineElemClass = 'line-elem'
        const scatterElemClass = 'scatter-elem'
        const metaheuristicElemClass = 'metaheuristic-elem'
        const functionAprox = getData(ff, domain[0], domain[1])

        const axis = new Axis({}, axisElemClass)
        const line = new LinePlot({}, lineElemClass)
        const scatter = new Scatter({}, scatterElemClass)
        const plot = new SVGMultipleVisualization(
            {
                width,
                height,
                domainX: { min: domain[0], max: domain[1] },
                domainY: { min: 0, max: 25 }
            },
            metaheuristicElemClass,
            [axis, line, scatter]
        )
        plot.setContainer(containerRef.current)
        plot.setup()
        const mappedData = functionAprox.map((d: number[]) => {
            return { x: d[0], y: d[1] }
        })
        plot.dataUpdate(mappedData, lineElemClass)

        twoDParticleEvolution(plot, scatterElemClass)
    }

    const threeDParticleEvolution = async (plot: ThreeMultipleVisualization, spheresElemClass: string) => {
        let doneMetaheuristic = false
        let metaheuristicValue = []

        const pso = new PSO({ populationSize: 3 } as PSOConfig)
        const psoGenerator = pso.fitAsync(
            Object.assign(new FitnessFunction(), {
                function: ff,
                dimensions: [{ min: domain[0], max: domain[1] }, { min: domain[0], max: domain[1] }]
            })
        )

        const snooze = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

        while (!doneMetaheuristic) {
            const regressionResult = psoGenerator.next()
            metaheuristicValue = regressionResult.value

            doneMetaheuristic = regressionResult.done || false
            plot.dataUpdate(
                // eslint-disable-next-line no-loop-func
                metaheuristicValue.map((position) => {
                    return { x: position[0], y: position[1], z: ff(position[0], position[1]), r: 1 }
                }),
                spheresElemClass
            )

            // eslint-disable-next-line no-await-in-loop
            await snooze(100)
        }
    }

    const threeDFunctionRepresentation = () => {
        const meshElemClass = 'mesh-elem'
        const spheresElemClass = 'sphere-elem'
        const metaheuristicElemClass = 'metaheuristic-elem'

        const mesh = new MeshPlot({}, meshElemClass)
        const spheres = new Sphere({}, spheresElemClass)
        const plot = new ThreeMultipleVisualization(
            {
                width,
                height
            },
            metaheuristicElemClass,
            [mesh, spheres]
        )
        plot.setContainer(containerRef.current)
        plot.setup()
        plot.dataUpdate(
            {
                zFunc: (x: number, y: number) => ff(x, y),
                xMin: domain[0],
                xMax: domain[1],
                yMin: domain[0],
                yMax: domain[1]
            },
            meshElemClass
        )
        threeDParticleEvolution(plot, spheresElemClass)
    }

    useEffect(() => {
        if (containerRef.current && type === '2D') {
            twoDFunctionRepresentation()
        } else {
            threeDFunctionRepresentation()
        }
    }, [containerRef])

    return (
        <div>
            <h4>{name}</h4>
            <h5>Global minimum: {globalM}</h5>
            <div ref={containerRef}></div>
        </div>
    )
}

const reps = [
    {
        name: 'Particle Swarm Optimisation - Ackley 2D',
        type: '2D',
        ff: Ackley,
        domain: ACKLEY_DOMAIN,
        globalM: ACKLEY_GLOBAL_M
    },
    {
        name: 'Particle Swarm Optimisation - Ackley 3D',
        type: '3D',
        ff: Ackley,
        domain: ACKLEY_DOMAIN,
        globalM: ACKLEY_GLOBAL_M
    }
]

export default function Metaheuristics() {
    // const reluData = getData(relu)

    const [vis] = useState(reps)

    return (
        <div>
            <h3>Metaheuristics</h3>
            {vis.map((val) => (
                <Representation
                    key={val.name}
                    ff={val.ff}
                    type={val.type}
                    domain={val.domain}
                    globalM={val.globalM}
                    name={val.name}
                    width={700}
                    height={350}
                />
            ))}
        </div>
    )
}