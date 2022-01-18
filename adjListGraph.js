class AdjListGraph {
    constructor(V = 1) {
        this.V = V
        this.adjList = new Array(V).fill([]);
    }

    addEdge(v, w, val) {
        this.adjList[v].push([w, val]);
    }

    DFSUtil(v, visited, dfsWalk){    
        visited[v] = true;
        dfsWalk.push(v)
        for (const n of this.adjList[v]) {
            if (!visited[n[0]]){
                this.DFSUtil(n[0], visited, dfsWalk);
            }            
        }
    }

    DFS(){    
        var visited = new Array(this.V).fill(false);
        var dfsWalk = []
        for (var i = 0; i < this.V; ++i){
            if (visited[i] == false){
                this.DFSUtil(i, visited, dfsWalk);
            } 
        }      
        return dfsWalk      
    }  
}

module.exports = AdjListGraph;