export const getAPIData = async (url, token) => {
    let JsonResult = await fetch(`http://localhost:3000/admin/${url}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json'
        }
    });
    let result = await JsonResult.json();
    if (JsonResult.ok && JsonResult.status === 200) {
        return ({
            data: result,
            error: false
        })
    } else {
        return ({
            data: result,
            error: true
        })
    }
}

export const postAPIData = async (url, data) =>{
    let JsonResult = await fetch(`http://localhost:3000/admin/${url}`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    });
    let result = await JsonResult.json();
    if (JsonResult.ok && JsonResult.status === 200) {
        return ({
            data: result,
            error: false
        })
    } else {
        return ({
            data: result,
            error: true
        })
    }
}