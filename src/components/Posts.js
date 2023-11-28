import { useState, useEffect } from 'react';
import { useApi } from '../contexts/ApiProvider';
import Spinner from 'react-bootstrap/Spinner';
import Post from './Post';
import More from './More';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default function Posts({ content }) {

    const [posts, setPosts] = useState();
    const [pagination, setPagination] = useState();
    const api = useApi();

    let url;
    switch (content) {
        case 'feed':
        case undefined:
            url = '/feed';
            break;
        case 'explore':
            url = '/posts';
            break;
        default:
            url = `/users/${content}/posts`
            break;
    }

    useEffect(() => {
        (async () => {
          const response = await api.get(url);
          if (response.ok) {
              const results = await response.body;
              setPosts(results.data);
              setPagination(results.pagination)
          }
          else {
              setPosts(null);
          }
        })();
    }, [api, url]);

    const loadNextPage = async () => {
        const response = await api.get(url, {
          after: posts[posts.length - 1].timestamp
        });
        if (response.ok) {
          setPosts([...posts, ...response.body.data]);
          setPagination(response.body.pagination)
        }
    };

    return (
        <>
          {posts === undefined ?
            <Spinner animation='border' />
          :
            <>
              {posts === null ?
                <p>Нет постов, нечего отображать</p>
              :
                posts.map(post => <Post key={post.id} post={post} />)
              }
              <More pagination={pagination} loadNextPage={loadNextPage}/>
            </>
          }
        </>
    );
}