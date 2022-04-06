import React from 'react';
import ContainerPage from '~/components/layouts/ContainerPage';
import ModulePostSmallThumbItems from '~/components/partials/blog/modules/ModulePostSmallThumbItems';
import WidgetBlogCategories from '~/components/shared/widgets/WidgetBlogCategories';
import WidgetBlogRecentComments from '~/components/shared/widgets/WidgetBlogRecentComments';
import WidgetBlogRecentPosts from '~/components/shared/widgets/WidgetBlogRecentPosts';
import WidgetBlogSearch from '~/components/shared/widgets/WidgetBlogSearch';


const BlogSmallThumbnailPage = () => {
   
    return (
        <ContainerPage title="Blog">
            <div className="ps-page--blog">
                <div className="container">
                    <div className="ps-page__header">
                        <h1>Our Press</h1>
                    </div>
                    <div className="ps-blog--sidebar">
                        <div className="ps-blog__left">
                            <ModulePostSmallThumbItems />
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

export default BlogSmallThumbnailPage;
