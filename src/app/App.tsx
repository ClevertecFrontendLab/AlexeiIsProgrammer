import Layout from '~/components/Layout';
import HomePage from '~/pages/Home';
import { useGetPostsQuery } from '~/query/services/posts.ts';

function App() {
    // 2 sprint
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    return (
        <Layout>
            <HomePage />
        </Layout>
    );
}

export default App;
