import { Outlet } from 'react-router';

import Layout from '~/components/Layout';
import { useGetPostsQuery } from '~/query/services/posts.ts';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
}

export default App;
