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

const initialNeID = "5"

function Topology() {
  const defaultDetailData = { isVisible: false }

  const [detailData, setDetailData] =
    useState<NodeDetailProps>(defaultDetailData)
  const [nodes, setNodes] = useState<Array<GraphNode>>([])
  const [edges, setEdges] = useState<Array<GraphEdge>>([])

  useEffect(() => {
    const { nodes, edges } = getNodeNeighbors(initialNeID);
    setNodes(nodes);
    setEdges(edges);
    anotherTest();
  }, []);

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
