import H_sort  from '../db/sort'

const query_sort = H_sort.querySort()

const addSort = (params) => {
    let params = {
        sort_name: params.sort_name,
        create_time: params.create_time
    }
    H_sort.addSort().then(res => {
        console.log(res)
    })
}

const  deleteSort = (params) => {
    H_sort.deleteSort(params).then(res => {
        console.log(res)
    })
}

const updateSort = (params) => {
    H_sort.updateSort(params).then(res => {
        console.log(res)
    })
}