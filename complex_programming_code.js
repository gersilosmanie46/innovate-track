/* complex_programming_code.js */

// This code is a complex programming example that demonstrates an implementation of a graph data structure in JavaScript.
// It includes various methods to perform operations on graphs such as adding and removing nodes, adding and removing edges, and finding the shortest path between two nodes.

class Graph {
  constructor() {
    this.nodes = [];
    this.edges = new Map();
  }

  addNode(node) {
    if (!this.nodes.includes(node)) {
      this.nodes.push(node);
      this.edges.set(node, []);
    }
  }

  removeNode(node) {
    const index = this.nodes.indexOf(node);
    if (index !== -1) {
      this.nodes.splice(index, 1);
      this.edges.delete(node);

      for (const connections of this.edges.values()) {
        const connectionIndex = connections.indexOf(node);
        if (connectionIndex !== -1) {
          connections.splice(connectionIndex, 1);
        }
      }
    }
  }

  addEdge(node1, node2) {
    if (this.nodes.includes(node1) && this.nodes.includes(node2)) {
      const connections1 = this.edges.get(node1);
      if (!connections1.includes(node2)) {
        connections1.push(node2);
      }

      const connections2 = this.edges.get(node2);
      if (!connections2.includes(node1)) {
        connections2.push(node1);
      }
    }
  }

  removeEdge(node1, node2) {
    if (this.nodes.includes(node1) && this.nodes.includes(node2)) {
      const connections1 = this.edges.get(node1);
      const connectionIndex1 = connections1.indexOf(node2);
      if (connectionIndex1 !== -1) {
        connections1.splice(connectionIndex1, 1);
      }

      const connections2 = this.edges.get(node2);
      const connectionIndex2 = connections2.indexOf(node1);
      if (connectionIndex2 !== -1) {
        connections2.splice(connectionIndex2, 1);
      }
    }
  }

  findShortestPath(startNode, targetNode) {
    const queue = [startNode];
    const visited = new Set();
    const predecessorMap = new Map();
    
    while (queue.length > 0) {
      const currentNode = queue.shift();
      visited.add(currentNode);

      if (currentNode === targetNode) {
        const path = [currentNode];
        let node = currentNode;

        while (node !== startNode) {
          node = predecessorMap.get(node);
          path.unshift(node);
        }

        return path;
      }

      const connections = this.edges.get(currentNode);
      for (const connectedNode of connections) {
        if (!visited.has(connectedNode)) {
          queue.push(connectedNode);
          visited.add(connectedNode);
          predecessorMap.set(connectedNode, currentNode);
        }
      }
    }
    
    return [];
  }
}

// Example usage

const graph = new Graph();

graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");

graph.addEdge("A", "B");
graph.addEdge("B", "C");
graph.addEdge("C", "D");
graph.addEdge("D", "A");

console.log("Nodes:", graph.nodes);
console.log("Edges:", graph.edges);

graph.removeNode("C");

console.log("Nodes after removing 'C':", graph.nodes);
console.log("Edges after removing 'C':", graph.edges);

const shortestPath = graph.findShortestPath("A", "D");
console.log("Shortest Path from 'A' to 'D':", shortestPath);
