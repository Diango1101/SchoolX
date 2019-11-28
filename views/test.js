function normalize(arr) {
    var arr0=[]
    var arr1=[]
    
    
    for(var i=0;i<arr.length;i++){
    arr0[i]=arr[i].toLocaleLowerCase()
    
    //console.log(arr0[i][0])
    console.log(arr[i][0].toLocaleUpperCase())
    }
       arr1=arr0.map(function (s){
           return s[0].toLocaleUpperCase()+s.slice(1)
           
       })
       
       console.log(arr1)
    console.log(arr0)
     return [arr1];
    }
    
    // 测试:
    if (normalize(['adam', 'LISA', 'barT']).toString() === ['Adam', 'Lisa', 'Bart'].toString()) {
        console.log('测试通过!');
    }
    else {
        console.log('测试失败!');
    }