import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import ReactPaginate from 'react-paginate';
import './style.scss';

class Dashboard extends Component {
    state = {
        data: null,
        page: 1,
        per_page: 6,
        total: 12,
        total_pages: 1,
        history:{}
    };

    componentDidMount() {
        axios.get('https://reqres.in/api/users?page=1').then(response => {
            if (response.data) {
                this.setState({
                    data: response.data.data, total_pages: response.data.total_pages,
                    page: response.data.page, per_page: response.data.per_page,
                    total: response.data.total, history:{...this.props.history},
                });
            }
        })
    }

    rowEvents = {
        onClick: (e, row, rowIndex) => {
            if (e.target.innerText && e.target.innerText === row.first_name) {
                this.handleRedirect(e, row, rowIndex);
            }
        }
    };

    handleRedirect = (e, row, rowIndex) => {
        this.state.history.push({
            pathname: `/users/id`,
            search: `${row.id}`,
            state: {
                data: row
            }
        });
    };

    handlePageClick = (e) => {
        axios.get(`https://reqres.in/api/users?page=${e.selected + 1}`).then(response => {
            if (response.data) {
                this.setState({
                    data: response.data.data, total_pages: response.data.total_pages,
                    page: response.data.page, per_page: response.data.per_page,
                    total: response.data.total
                });
            }
        })
    };

    render() {
        const{history} = this.props;
        console.log("history", history)
        const {page, per_page, total, total_pages} = this.state;
        const tabelData = {
            columns: [
                {
                    dataField: 'id',
                    text: 'ID',
                    sort: true,
                },
                {
                    dataField: 'last_name',
                    text: 'Last Name',
                    sort: true
                },
                {
                    dataField: 'first_name',
                    text: 'First Name',
                    sort: true,
                    classes: 'link',
                },
                {
                    dataField: 'email',
                    text: 'Email',
                    sort: true
                },
                {
                    dataField: 'avatar',
                    text: 'Avtar',
                    sort: true,
                }
            ],
            fields: [
                {
                    dataField: 'id',
                    text: '0',
                }
            ],
            defaultSorted: [
                {
                    dataField: 'name',
                    order: 'desc'
                }
            ]
        };
        return (
            <div>
                <div className="table-wrapper">
                    {this.state.data && this.state.data.length &&
                    <BootstrapTable
                        bootstrap4
                        keyField="id"
                        data={this.state.data}
                        columns={tabelData.columns}
                        bordered={false}
                        fields={tabelData.fields}
                        rowEvents={this.rowEvents}
                        pagination={false}
                    />}
                    {this.state.data && this.state.data.length ? <div className="orderPagination">
                        <span> Showing rows {page} to {per_page} of {total_pages} </span>
                        < ReactPaginate
                            previousLabel={'<'}
                            nextLabel={'>'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={6 / (this.state.total_pages + 1)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={'pagination order'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                        />
                    </div> : ""}

                </div>
            </div>
        );
    }
}


export default withRouter(Dashboard);
