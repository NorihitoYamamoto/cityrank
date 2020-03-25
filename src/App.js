import React, {Component} from 'react';
import {DataSearch,ReactiveBase,ReactiveList,ResultList,SelectedFilters} from '@appbaseio/reactivesearch';
import './CityRank.css';

const {ResultListWrapper} = ReactiveList;

class App extends Component {
    componentDidMount() {
        document.title = "City Population Rank"
    }
    render() {
        return (
            <div className = "main-class">
                <ReactiveBase
                    app = "cityindex"
                    url = "https://search-bimilist2-elubdsi3x4beh3gb6tcbdxd72u.ap-northeast-1.es.amazonaws.com"
                >
                    <DataSearch
                        componentId = "search-component"
                        dataField = {["countryname"]}
                        title = "国名を入れてください"
                        placeholder = "例：日本"
                        showIcon={false}
                        className="search-class"
                    />
                    <ReactiveList
                        componentId = "list-component"
                        pagination = {true}
                        size = {10}
                        react = {{
                            "and": ["search-component"]
                        }}
                        sortOptions={[
                            {label: "ランク", dataField: "rank", sortBy: "asc"}
                        ]}
                        className = "list-class"
                        innerClass={{
                            button: "button-innerclass",
                        }}
                    >
                        {({data, error, loading}) => (
                            <ResultListWrapper>
                                {
                                    data.map(item => (
                                        <ResultList key = {item._id} className = "item-class">
                                            <ResultList.Content>
                                                <ResultList.Title
                                                    dangerouslySetInnerHTML = {{
                                                        __html: item.cityname
                                                    }}
                                                />
                                                <ResultList.Description>
                                                    <div className="description-class">
                                                        <div className="countryname-class"> {item.countryname} </div>
                                                        <div className="population-class"> {item.population}万人 </div>
                                                    </div>
                                                </ResultList.Description>
                                            </ResultList.Content>
                                        </ResultList>
                                    ))
                                }
                            </ResultListWrapper>
                        )}
                    </ReactiveList>
                </ReactiveBase>
            </div>
        );
    }
}

export default App;
