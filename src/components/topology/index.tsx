import React, { useEffect, useState } from "react"
import { GraphEdge, GraphNode, InternalGraphNode } from "reagraph"
import { getNodeNeighbors, getNodeData } from "../../api/api"
import { Graph } from "./Graph"
import { NodeDetail, NodeDetailProps } from "./NodeDetail"
import LoadingOverlay from "react-loading-overlay-ts"
import { Legend } from "./Legend"

const styles = {
  container: {
    padding: "10px",
  },
  loadingOverlay: {
    width: "100%",
  },
}

// Use this for build
const endpoint = "/inventory/inventory/topology"

// Use this for development
// const endpoint = "/api/inventory/topology"

function Topology() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false)
  const [nodes, setNodes] = useState<Array<GraphNode>>([])
  const defaultDetailData = { isVisible: false }
  const [edges, setEdges] = useState<Array<GraphEdge>>([])
  const [detailData, setDetailData] =
    useState<Omit<NodeDetailProps, "isLoading">>(defaultDetailData)

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const path = location.pathname
    if (path.length > endpoint.length) {
      const pk = path.substring(path.search(endpoint) + endpoint.length + 1)
      void fetchAdjacencyData(pk)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchAdjacencyData = async (id: string) => {
    if (id && !isNaN(parseInt(id))) {
      setIsLoading(true)
      const adjacencyData = await getNodeNeighbors(id)
      if (adjacencyData) {
        const newNodes = adjacencyData.nodes.filter(
          (newNode) => !nodes.find((node) => node.id === newNode.id)
        )
        const newEdges = adjacencyData.edges.filter(
          (newEdge) => !edges.find((edge) => newEdge.id === edge.id)
        )
        setNodes([...nodes, ...newNodes])
        setEdges([...edges, ...newEdges])
      }
      setIsLoading(false)
    }
  }

  const canvasClickHandler = () => {
    setDetailData(defaultDetailData)
  }

  const nodeHoverHandler = async (node: InternalGraphNode) => {
    setIsDetailLoading(true)
    setDetailData({ isVisible: true })
    const data = await getNodeData(node.id)
    setDetailData({ isVisible: true, data })
    setIsDetailLoading(false)
  }

  const nodeClickHandler = async (node: InternalGraphNode) => {
    await fetchAdjacencyData(node.data.id)
  }

  return (
    <div style={styles.container}>
      <LoadingOverlay
        styles={{ wrapper: styles.loadingOverlay }}
        active={isLoading}
        spinner
        text="Updating graph..."
      >
        <Graph
          nodes={nodes}
          edges={edges}
          canvasClickHandler={canvasClickHandler}
          nodeClickHandler={nodeClickHandler}
          nodeHoverHandler={nodeHoverHandler}
        />
        <NodeDetail
          isVisible={detailData.isVisible}
          data={detailData.data}
          isLoading={isDetailLoading}
        />
        <Legend />
      </LoadingOverlay>
    </div>
  )
}

export default Topology
