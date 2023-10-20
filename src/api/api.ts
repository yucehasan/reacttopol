import { API_URL, endpoints } from "../constants";
import { GraphNode, GraphEdge } from "reagraph";
import { NodeDetailData } from "../components/topology/NodeDetail";
import axios from "axios";

const NODE_COUNT = 10;

const testApi = () => {
  axios
    .get("/api/v1/temip/all_alarms/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic dGVzdF91c2VyOnRlc3RfcGFzcwo=",
      },
    })
    .then((resp) => {
      console.log("Response", resp);
    })
    .catch((err) => {
      console.log("Error", err.response.status);
    });
};

const anotherTest = () => {
  axios
    .get("/inventory/inventory/network_element_detail_api/5")
    .then((resp) => {
      console.log("Response", resp);
    })
    .catch((err) => {
      console.log("Error", err.response.status);
    });
};

const getNodeNeighbors = (
  id: string
): { nodes: Array<GraphNode>; edges: Array<GraphEdge> } => {
  const nodes: Array<GraphNode> = Array(NODE_COUNT)
    .fill(0)
    .map((val, index) => {
      return {
        id: "" + index,
        label: "ne_" + index,
      };
    });

  let edges: Array<GraphEdge> = nodes
    .map(({ id, label }) => {
      const source = parseInt(id);

      if (parseInt(id) < 2) {
        return [];
      }
      return Array(Math.floor((Math.random() * NODE_COUNT) / 2))
        .fill(0)
        .map(() => {
          let target = Math.floor(Math.random() * source);
          while (target >= source) {
            target = Math.floor(Math.random() * source);
          }
          return {
            source: "" + source,
            target: "" + target,
            id: source + "-" + target,
            label: source + "-" + target,
          };
        });
    })
    .flat();
  edges = Array.from(new Map(edges.map((edge) => [edge.label, edge])).values());
  console.log("fetching nodes for", id, "from", API_URL); // TODO

  let result;
  axios
    .get<any>(`${endpoints.NE_ADJACENCY}${id}`)
    .then((resp) => {
      result = resp.data;
    })
    .catch((err) => {
      console.log("Error", err.response.status);
    });
  // return result

  return { nodes, edges };
};

const getNodeData = async (id: string): Promise<NodeDetailData | undefined> => {
  const result = await axios
    .get<NodeDetailData>(`${endpoints.NE_DETAIL}${id}`)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.log("Error", err.response.status);
      return undefined;
    });
  return result;
};

export { getNodeNeighbors, getNodeData, testApi, anotherTest };
