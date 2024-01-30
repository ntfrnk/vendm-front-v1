
let defaultParams = {
    multi: {
        status: 'all',
        page: 1,
        take: 10,
        ordering: 'id,asc',
        load: '',
        exclude: '',
        except: '',
    },
    single: {
        load: '',
        exclude: '',
    }
};

export const setParams = (params = {}, type = 'multi') => {
    const final_params = {
        ...defaultParams[type],
        ...params
    };
    let joiner = [];
    for(let item of Object.entries(final_params)){
        joiner.push(item[0] + '=' + item[1]);
    }
    let query = '?' + joiner.join('&');
    return query;
}