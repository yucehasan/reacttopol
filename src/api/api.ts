import { endpoints } from "../constants"
import { GraphNode, GraphEdge } from "reagraph"
import { NodeDetailData } from "../components/topology/NodeDetail"
import axios from "axios"

const getNodeNeighbors = async (
  id: string
): Promise<
  { nodes: Array<GraphNode>; edges: Array<GraphEdge> } | undefined
> => {
  const result = axios
    .get<{ nodes: Array<GraphNode>; edges: Array<GraphEdge> }>(
      `${endpoints.NE_ADJACENCY}${id}`
    )
    .then((resp) => {
      return resp.data
    })
    .catch((err) => {
      console.log("Error", err.response.status)
      return undefined
    })
  return result
}

const getNodeData = async (id: string): Promise<NodeDetailData | undefined> => {
  const result = await axios
    .get<NodeDetailData>(`${endpoints.NE_DETAIL}${id}`)
    .then((resp) => {
      return resp.data
    })
    .catch((err) => {
      console.log("Error", err.response.status)
      return undefined
    })
  return result
}

export { getNodeNeighbors, getNodeData }
