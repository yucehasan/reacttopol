import React, { useEffect, useState } from "react"
import { GraphEdge, GraphNode, InternalGraphNode } from "reagraph"
import { getNodeNeighbors, getNodeData } from "../../api/api"
import { Graph } from "./Graph"
import { NodeDetail, NodeDetailProps } from "./NodeDetail"

const styles = {
  container: {
    padding: "10px",
  },
}

const endpoint = "/api/alarm/topology"

function Topology() {
  const defaultDetailData = { isVisible: false }

  const [detailData, setDetailData] =
    useState<NodeDetailProps>(defaultDetailData)
  const [nodes, setNodes] = useState<Array<GraphNode>>([])
  const [edges, setEdges] = useState<Array<GraphEdge>>([])
  const [centerPk, setCenterPk] = useState<string>("")

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const path = location.pathname
    if (path.length > endpoint.length) {
      const pk = path.substring(path.search(endpoint) + endpoint.length + 1)
      setCenterPk(pk)
    }
  }, [])

  useEffect(() => {
    const fetchAdjacencyData = async () => {
      if (centerPk && !isNaN(parseInt(centerPk))) {
        const adjacencyData = await getNodeNeighbors(centerPk)
        if (adjacencyData) {
          setNodes(nodes)
          setEdges(edges)
        }
      }
    }
    void fetchAdjacencyData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerPk])

  const canvasClickHandler = () => {
    setDetailData(defaultDetailData)
  }

  const nodeHoverHandler = async (node: InternalGraphNode) => {
    const data = await getNodeData(node.id)
    console.log(data)
    setDetailData({ isVisible: true, data })
  }

  return (
    <div style={styles.container}>
      <Graph
        nodes={nodes}
        edges={edges}
        canvasClickHandler={canvasClickHandler}
        nodeClickHandler={() => {}}
        nodeHoverHandler={nodeHoverHandler}
      />
      <NodeDetail isVisible={detailData.isVisible} data={detailData.data} />
    </div>
  )
}

export default Topology
