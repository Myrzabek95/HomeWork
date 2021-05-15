function maxItemAssociation(usersOrders){
        
    if(usersOrders.length === 0)
        return null;
    
    recomendations = [];
    recomendations.push(usersOrders[0]);
    for(i = 1; i<usersOrders.length; i++){
        isAdded = false;
        for(j = 0; j<recomendations.length; j++){
            arr = usersOrders[i].filter(item => !recomendations[j].includes(item));
            if(usersOrders[i].length>arr.length)
            {
                recomendations[j] = recomendations[j].concat(arr);
                isAdded = true;
                break;
            }
        }
        if(!isAdded)
            recomendations.push(usersOrders[i]);
    }

    maxLength = Math.max(...recomendations.map(el=>el.length));
    recomendations=recomendations.filter(item => item.length === maxLength);
    result = recomendations[0].sort();
    for(i = 1; i<recomendations.length; i++){
        arr = recomendations[i].sort();
        if(result[0]>arr[0])
        result = arr;
    }

    return result;
}