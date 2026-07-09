interface FilterSearch {
    keyword: string;
    regex: RegExp;
}

const searchHelper = (query: Record<string, any>): FilterSearch => {
    const filterSearch: FilterSearch = {
        keyword: "",
        regex: new RegExp("", "i")
    };
    if(query.keyword){
        filterSearch.keyword = query.keyword;
        filterSearch.regex = new RegExp(query.keyword, 'i');
        
    }
    return filterSearch;
}

export default searchHelper;