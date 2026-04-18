import HeadingTitle from '../components/HeadingTitle';
import { LayoutDashboard, PanelsTopLeft, Plus } from 'lucide-react';
import StaticPageItem from './components/StaticPageItem';
import Categories from './components/Categories';

const Content = () => {
    return (
        <div className="min-h-screen pt-3 pb-5">
            <HeadingTitle
                title='Content Management'
                description='Manage pages, categories.'
            />
            <div className='mt-5'>
                <Categories />
            </div>
        </div>
    );
};

export default Content;