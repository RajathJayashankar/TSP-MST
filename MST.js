var AdjListGraph = require('./adjListGraph');


function minKey(key, mstSet, V)
{
    let min = Number.MAX_VALUE, min_index;
 
    for (let v = 0; v < V; v++)
        if (mstSet[v] == false && key[v] < min)
            min = key[v], min_index = v;
 
    return min_index;
}
 

function printMST(parent, graph, V)
{    
    selectedTree = new AdjListGraph(V)
    for (let i = 1; i < V; i++){
        selectedTree.addEdge(i, parent[i], graph[i][parent[i]])
    }

    var path = selectedTree.DFS()
    // console.log("Edge      Weight" + "<br>");
    // for (let i = 1; i < V; i++)
    //     console.log(parent[i] + "   -  " + i + "     " + graph[i][parent[i]] + "<br>");

    return path
}
 
// Function to construct and print MST for
// a graph represented using adjacency
// matrix representation
function primMST(graph, V)
{
    // Array to store constructed MST
    let parent = [];
     
    // Key values used to pick minimum weight edge in cut
    let key = [];
     
    // To represent set of vertices included in MST
    let mstSet = [];
 
    // Initialize all keys as INFINITE
    for (let i = 0; i < V; i++)
        key[i] = Number.MAX_VALUE, mstSet[i] = false;
 
    // Always include first 1st vertex in MST.
    // Make key 0 so that this vertex is picked as first vertex.
    key[0] = 0;
    parent[0] = -1; // First node is always root of MST
 
    // The MST will have V vertices
    for (let count = 0; count < V - 1; count++)
    {
        // Pick the minimum key vertex from the
        // set of vertices not yet included in MST
        let u = minKey(key, mstSet, V);
 
        // Add the picked vertex to the MST Set
        mstSet[u] = true;
 
        // Update key value and parent index of
        // the adjacent vertices of the picked vertex.
        // Consider only those vertices which are not
        // yet included in MST
        for (let v = 0; v < V; v++)
 
            // graph[u][v] is non zero only for adjacent vertices of m
            // mstSet[v] is false for vertices not yet included in MST
            // Update the key only if graph[u][v] is smaller than key[v]
            if (graph[u][v] && mstSet[v] == false && graph[u][v] < key[v])
                parent[v] = u, key[v] = graph[u][v];
    }
 
    // print the constructed MST
    return printMST(parent, graph, V);

}

exports.primMST = primMST