import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllUsers = () => {
    const [users, setUsers] = useState([])
    const [searchedUsers, setSearchedUsers] = useState(users)
    const [sort, setSort] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3);
    const pageNumbers = [];
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const [searchedData, setSearchedData] = useState({name: '', email: '', website: ''})

    for (let i = 1; i <= Math.ceil(searchedUsers.length / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    //loading all users
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data)
                setSearchedUsers(data)
            })
    }, [])

    useEffect(() => {
        const searchedData = window.localStorage.getItem('searchedData')
        const currentPage = window.localStorage.getItem('currentPage')
        const postsPerPage = window.localStorage.getItem('postsPerPage')
        const sort = window.localStorage.getItem('sort')
        setSearchedData(JSON.parse(searchedData))
        setCurrentPage(JSON.parse(currentPage))
        setPostsPerPage(JSON.parse(postsPerPage))
        setSort(JSON.parse(sort))
    }, [])

    useEffect(() => {
        window.localStorage.setItem('searchedData', JSON.stringify(searchedData))
        window.localStorage.setItem('currentPage', JSON.stringify(currentPage))
        window.localStorage.setItem('postsPerPage', JSON.stringify(postsPerPage))
        window.localStorage.setItem('sort', JSON.stringify(sort))
    })

    useEffect(() => {
        const filterUser = users.filter(user => user.name.toLowerCase().includes(searchedData.name.toLowerCase() || searchedData.email.toLocaleLowerCase() || searchedData.website.toLocaleLowerCase()))

        const sorted = filterUser.sort((a, b) => {
            const isReverse = (sort === "asc") ? 1 : -1
            return isReverse * a.name.localeCompare(b.name)
        })
        setSearchedUsers(sorted);
    }, [searchedData.email, searchedData.name, searchedData.website,users, sort])

    //handling search by name functionality
    const handleSearch = e => {
        setSearchedData({
            ...searchedData,
            [e.target.name]:e.target.value
        })
        const filterUser = users.filter(user => user.name.toLowerCase().includes(searchedData.name.toLowerCase() || searchedData.email.toLocaleLowerCase() || searchedData.website.toLocaleLowerCase()))
        setSearchedUsers(filterUser);
    }

    //handling ASC and DSC sorting functionality
    const handleSorted = (sortType) => {
        const sorted = searchedUsers.sort((a, b) => {
            const isReverse = (sortType === "asc") ? 1 : -1
            return isReverse * a.name.localeCompare(b.name)
        })
        setSort(sortType)
        setUsers(sorted)
    }

    //handling pagination functionality
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = searchedUsers?.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className="pt-24 text-center md:px-12 overflow-x-scroll">
            <h1 className="font-bold py-4 text-2xl">All Users List Here</h1>
            <div className="flex justify-between">
                <div className="flex justify-center">
                    <button className="btn" onClick={() => handleSorted('asc')}>ASC</button>
                    <button className="btn" onClick={() => handleSorted('dsc')}>DSC</button>
                </div>
                <div>
                    <p className="font-bold border-b-1 border-primary">Post Per Page</p>
                    <select
                        onChange={(e) => setPostsPerPage(parseInt(e.target.value))}
                        value={postsPerPage}
                    >
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value={users.length}>All</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-between flex-wrap px-2 md:px-12 py-4 bg-primary text-white">
                <h1>Name</h1>
                <h1>Email</h1>
                <h1>Website</h1>
            </div>
            <div className="flex justify-between flex-wrap px-2 md:px-12 pt-4">
                <input
                    onChange={handleSearch}
                    type="text"
                    placeholder="Search by name"
                    name="name"
                    value={searchedData?.name}
                    className="rounded py-2 md:py-2 px-2 md:px-8  ring-0 focus:outline-none border border-gray-700"
                />
                <input
                    onChange={handleSearch}
                    type="text"
                    name="email"
                    value={searchedData?.email}
                    placeholder="Search by email"
                    className="rounded py-2 md:py-2 px-2 md:px-8  ring-0 focus:outline-none border border-gray-700"
                />
                <input
                    onChange={handleSearch}
                    type="text"
                    name="website"
                    value={searchedData?.website}
                    placeholder="Search by website"
                    className="rounded py-2 md:py-2 px-2 md:px-8  ring-0 focus:outline-none border border-gray-700"
                />
            </div>
            <div className="my-4">
                {currentPosts.map(user =>
                    <div className="flex justify-between flex-wrap mb-2 px-2 md:px-12 py-4 border-b-2 border-primary">
                        <Link to={`/user/${user.id}`}>{user.name}</Link>
                        <h1>{user.email}</h1>
                        <h1>{user.website}</h1>
                    </div>)}
            </div>
            <div className="flex justify-center">
                {pageNumbers.map(pageNumber => (
                    <button className="px-4 py-2 bg-primary text-white mx-2" onClick={() => paginate(pageNumber)}>{pageNumber}</button>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;