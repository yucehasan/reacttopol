import React, { useState } from "react"
import {
  GraphCanvas,
  GraphEdge,
  GraphNode,
  InternalGraphNode,
  NodeRendererProps,
  Svg,
  Theme,
} from "reagraph"

import Logo from "./computer.svg"

const graphTheme: Theme = {
  canvas: {
    background: "#b2b2c2",
  },
  node: {
    fill: "#e5e5ee",
    activeFill: "white",
    opacity: 0.9,
    selectedOpacity: 1,
    inactiveOpacity: 0.1,
    label: {
      color: "black",
      activeColor: "#e5e5ee",
    },
  },
  ring: {
    fill: "black",
    activeFill: "red",
  },
  edge: {
    fill: "black",
    activeFill: "black",
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.7,
    label: {
      color: "black",
      stroke: "black",
      activeColor: "red",
    },
  },
  arrow: {
    fill: "black",
    activeFill: "red",
  },
  lasso: {
    background: "black",
    border: "black",
  },
}

type GraphProps = {
  nodes: Array<GraphNode>
  edges: Array<GraphEdge>
  canvasClickHandler: () => void
  nodeClickHandler: (node: InternalGraphNode) => void
  nodeHoverHandler: (node: InternalGraphNode) => void
}

export const Graph = (props: GraphProps): React.ReactElement => {
  const {
    canvasClickHandler,
    nodeClickHandler,
    nodeHoverHandler,
    nodes,
    edges,
  } = props
  const [collapseNodes, setCollapseNodes] = useState<Array<string>>([])

  const collapseNode = (id: string) => {
    if (collapseNodes.includes(id)) {
      setCollapseNodes(collapseNodes.filter((n) => n !== id))
    } else {
      setCollapseNodes([...collapseNodes, id])
    }
  }

  const renderNode = (props: NodeRendererProps) => {
    return (
      <Svg
        {...props}
        color="black"
        image={Logo}
        active={collapseNodes.includes(props.node.id)}
      />
    )
  }

  return (
    <div style={{ marginTop: "70px", maxHeight: "100px" }}>
      <GraphCanvas
        nodes={nodes}
        edges={edges}
        theme={graphTheme}
        onCanvasClick={canvasClickHandler}
        collapsedNodeIds={collapseNodes}
        edgeArrowPosition="none"
        draggable={true}
        onNodeClick={(props) => {
          const { id } = props
          collapseNode(id)
          nodeClickHandler(props)
        }}
        onNodePointerOver={nodeHoverHandler}
        renderNode={renderNode}
      />
    </div>
  )
}
