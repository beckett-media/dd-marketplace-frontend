import React from 'react';
import ContainerPage from '~/components/layouts/ContainerPage';
import ModulePostGridItems from '~/components/partials/blog/modules/ModulePostGridItems';
import WidgetBlogCategories from '~/components/shared/widgets/WidgetBlogCategories';
import WidgetBlogRecentComments from '~/components/shared/widgets/WidgetBlogRecentComments';
import WidgetBlogRecentPosts from '~/components/shared/widgets/WidgetBlogRecentPosts';
import WidgetBlogSearch from '~/components/shared/widgets/WidgetBlogSearch';

const BlogRightSidebarPage = () => {
    return (
        <ContainerPage title="Blog" boxed={true}>
            <div className="ps-page--blog">
                <div className="container">
                    <div className="ps-page__header">
                        <h1>Our Press</h1>
                    </div>
                    <div className="ps-blog--sidebar">
                        <div className="ps-blog__left">
                            <ModulePostGridItems columns={3} />
                        </div>
                        <div className="ps-blog__right">
                            <WidgetBlogSearch />
                            <WidgetBlogCategories />
                            <WidgetBlogRecentPosts />
                            <WidgetBlogRecentComments />
                        </div>
                    </div>
                </div>
            </div>
        </ContainerPage>
    );
};

export default BlogRightSidebarPage;
