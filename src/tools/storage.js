const stroage ={
    //sessionStorage
    session:{
        get:(key)=>{
            //当传入的值为number类型时
            if( typeof key === "number" ){
                const slength = Object.keys(sessionStorage)
                let arr = new Array()
                for(let i=0; i<slength.length; i++){
                    let keys = Object.keys(sessionStorage)[i]
                    let values = sessionStorage.getItem(keys)
                    arr[i] = {
                        key:keys,
                        value:values
                    }
                    if(i == key){
                        return arr[i]
                    }
                }
            }
            //否则
            try{
                return JSON.parse(sessionStorage.getItem(key))
            }catch{
                return sessionStorage.getItem(key)
            }
        },
        set:(key,value)=>{
            return sessionStorage.setItem(key,JSON.stringify(value))
        },
        remove:(key)=>{
            sessionStorage.removeItem(key)
        },
        clear:()=>{
            sessionStorage.clear()
        },
        length:(()=>{
            const arr = Object.keys(sessionStorage)
            return arr.length
        })(),
        each:(callback)=>{
            let arr = new Array()
            for(let i=0; i<stroage.session.length; i++){
                let key = Object.keys(sessionStorage)[i]
                let value = stroage.session.get(key)
                arr[i] = {
                    key,value
                } 
            }
            return arr.forEach( (item,index) =>{
                callback(item,index)
            })
        }
    },
    //localStorage
    local:{
        get:(key)=>{
            //当传入的值为number类型时
            if( typeof key === "number" ){
                const llength = localStorage.length
                let arr = new Array()
                for(let i=0; i<llength; i++){
                    let keys = localStorage.key(i)
                    let values = localStorage.getItem(keys)
                    arr[i] = {
                        key:keys,
                        value:values
                    }
                    if(i == key){
                        return arr[i]
                    }
                }
            }
            //否则
            try{
                return JSON.parse(localStorage.getItem(key))
            }catch{
                return localStorage.getItem(key)
            }
        },
        set:(key,value)=>{
            return localStorage.setItem(key,JSON.stringify(value))
        },
        remove:(key)=>{
            localStorage.removeItem(key)
        },
        clear:()=>{
            localStorage.clear()
        },
        length:localStorage.length,
        each:(callback)=>{
            let arr = new Array()
            for(let i=0; i<stroage.local.length; i++){
                let key = localStorage.key(i)
                let value = localStorage.getItem(key)
                arr[i] = {
                  key,value
                }
            }
            return arr.forEach( (item,index)=> {
                callback(item,index)
            })
        },
    },
    cookie:{
        set:(key,value,time)=>{
            const date = new Date()  
            date.setTime( date.getTime() + Number(time) * 24 * 60 * 60 * 1000) 
            document.cookie = key+'='+value+ ';expires=' +date.toUTCString(); 
        },
        get:(key)=>{
            const cookies = document.cookie;
            const cookieArr = cookies.split(';');
            const cookieObj = new Object();
            //number
            // let numberObj = new Object()
            // let indexs =0;
            cookieArr.forEach((item,index)=>{
                let newArr = item.split("=");
                cookieObj[newArr[0].trim()] = newArr[1]
                //当key为number时
                // indexs = index
                // if(typeof key === "number" && index == key){
                //     const keys = newArr[0].trim()
                //     const values = newArr[1]
                //     numberObj = {
                //         key:keys,
                //         value:values
                //     }
                //     return numberObj
                // }
            })
            //number时
            // if(typeof key === "number" && indexs == key){
            //     return numberObj
            // }
            
            for(let name in cookieObj){
                if(name == key){ 
                    return cookieObj.name
                }
            }
        },
        remove:(key)=>{
            const date = new Date() 
            date.setTime(date.getTime()+ -1 *24*60*60*1000);
            document.cookie = key+'='+' ;expires=' +date.toUTCString();
        },
        clear:()=>{
            const date = new Date()
            date.setTime(date.getTime()+ -1 *24*60*60*1000);
            const cookies = document.cookie;
            const cookieArr = cookies.split(';');
            const cookieObj = new Object();
            cookieArr.forEach(item=>{
                let newArr = item.split("=");
                cookieObj[newArr[0].trim()] = newArr[1]
            })
            for(let key in cookieObj){
                document.cookie = key+'='+' ;expires=' +date.toUTCString();
            }
        }
    }
}
export default stroage