import { Outlet } from 'react-router';

import Header from '~/components/Header';
import { useGetPostsQuery } from '~/query/services/posts.ts';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default App;
