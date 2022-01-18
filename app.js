var dataParse = require('./readJson');
var mst = require('./MST');
var AdjMatrixGraph = require('./adjMatrixGraph');

function minDistance(dist,sptSet, V)
{
    let min = Number.MAX_VALUE;
    let min_index = -1;
    
    for(let v = 0; v < V; v++)
    {
        if (sptSet[v] == false && dist[v] <= min) 
        {
            min = dist[v];
            min_index = v;
        }
    }
    return min_index;
}

function dijkstra(graph, src, V)
{
    let dist = new Array(V);
    let sptSet = new Array(V);

    for(let i = 0; i < V; i++)
    {
        dist[i] = Number.MAX_VALUE;
        sptSet[i] = false;
    }
    
    dist[src] = 0;

    for(let count = 0; count < V - 1; count++)
    {
        let u = minDistance(dist, sptSet, V);    
        sptSet[u] = true;

        for(let v = 0; v < V; v++)
        {
            if (!sptSet[v] && graph[u][v] != 0 && dist[u] != Number.MAX_VALUE && dist[u] + graph[u][v] < dist[v]){
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }

    return dist
}

function writeToFile(filePath = './default.txt', data){
    fs = require('fs')

    fs.writeFile(filePath, data, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Data Written to file: ' + filePath);
    });
}

dataParse.loadJSON(function(data) {
    var dataDict = {};    
    var it = 0

    for (loc in data){
        dataDict[loc] = it;
        it += 1;
    }

    var V = Object.keys(dataDict).length
    var nodeList = Array(V).fill(' ')

    for (nodeVal in dataDict){
        nodeList[dataDict[nodeVal]] = nodeVal
    }

    var graph = new AdjMatrixGraph(V)

    for (loc in data){
        var d = data[loc]
        for(var j = 0; j < d.length; j++){
            graph.addEdge(dataDict[loc], dataDict[d[j][0]], d[j][1])
        }        
    }

    selectedGraph = new AdjMatrixGraph(V)

    for(let i = 0; i < V; i++){
        var distances = dijkstra(graph.matrix, i, V)
        for(let j = 0; j < V; j++){
            selectedGraph.addEdge(i, j, distances[j])
        }
    }

    writeToFile('./graph.json', JSON.stringify(graph))
    // console.log(selectedGraph)

    writeToFile('./selectedGraph.json', JSON.stringify(selectedGraph))
    path = mst.primMST(selectedGraph.matrix, V) 

    var output = []
    for (x in path){
        output.push(nodeList[x])
    }    
    output.push(output[0])

    console.log(output)
    writeToFile('./outputPath.json', JSON.stringify(output))
});

