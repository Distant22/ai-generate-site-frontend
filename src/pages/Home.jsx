import React, {useState, useEffect} from 'react'

import {Loader, Card, FormField} from '../components'

// data：一個儲存搜尋結果的Array
// title：若找不到任何Data，則回傳這串文字
const RenderCards = ({ data, title }) => {
    if(data?.length > 0) return data.map((post) => <Card key={post._id} {...post} />)

    return (
        <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
            { title }
        </h2>
    )
}


const Home = () => {

    const [loading, setLoading] = useState(false)
    const [allPosts, setAllPosts] = useState(null)

    const [searchText, setSearchText] = useState('')
    const [searchedResults, setSearchedResults] = useState(null)
    const [searchTimeout, setSearchTimeout] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)
            try {
                const response = await fetch('https://ai-generate-site.onrender.com/api/v1/post', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                if(response.ok) {
                    const result = await response.json()
                    setAllPosts(result.data.reverse())
                }
            } catch (error) {
                alert(error)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout)

        setSearchText(e.target.value)

        setSearchTimeout(
            setTimeout(() => {
                const searchResults = allPosts.filter((item) => 
                    item.name.toLowerCase().includes(searchText.toLowerCase()) || 
                    item.prompt.toLowerCase().includes(searchText.toLowerCase()))
    
                    setSearchedResults(searchResults)
            }, 500)
        )
       
    }

    return (
    <section className='max-w-7xl mx-auto'>
        <div>
            <h1 className="font-inter font-extrabold text-[#222328] text-[32px]">社群</h1>
            <p className="font-inter mt-2 text-[#666e75] text-[16px] max-w[500px]">網友分享的 DALL-E AI 生成圖像</p>
        </div>

        <div className="mt-16">
            <FormField
                LabelName = "搜尋圖像"
                type = "text"
                name = "text"
                placeholder = "輸入文字..."
                value = {searchText}
                handleChange = {handleSearchChange}
            />
        </div>

        <div className="mt-10">
            {loading ? (
                <div className="flex justify-center items-center">
                    <Loader/>
                </div>
            ) : (
                <>
                    {searchText && (
                        <h2 className="font-inter font-medium text-[#666e75] text-xl mb-3">
                            <span className="text-[#222328]"> 
                                {searchText}的搜尋結果
                            </span>
                        </h2>
                    )}
                    <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                        {searchText ? (
                            <RenderCards 
                                data={searchedResults}
                                title="No search results found"
                            />
                        ) : (
                            <RenderCards
                                data={allPosts}
                                title="No posts found" 
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    </section>
    )
}

export default Home