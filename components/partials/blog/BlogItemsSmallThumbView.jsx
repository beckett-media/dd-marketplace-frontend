import React, { useEffect, useState } from 'react';
import CustomPagination from '~/components/elements/common/CustomPagination';
import PostGrid from '~/components/elements/post/PostGrid';
import WidgetBlogCategories from '~/components/shared/widgets/WidgetBlogCategories';
import WidgetBlogRecentComments from '~/components/shared/widgets/WidgetBlogRecentComments';
import WidgetBlogRecentPosts from '~/components/shared/widgets/WidgetBlogRecentPosts';
import WidgetBlogSearch from '~/components/shared/widgets/WidgetBlogSearch';
import PostRepository from '~/repositories/PostRepository';

const BlogItemsSmallThumbView = ({ collectionSlug, columns, layout }) => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState(null);

    async function getPosts() {
        let queries, APIPosts;
        if (collectionSlug !== undefined) {
            queries = {
                slug_eq: collectionSlug,
            };
            APIPosts = await PostRepository.getPostsByCollectionSlug(queries);
        } else {
            queries = {
                _limit: 6,
            };
            APIPosts = await PostRepository.getPosts(queries);
        }

        if (APIPosts) {
            setTimeout(function () {
                setLoading(false);
            }, 200);
            setPosts(APIPosts);
            return APIPosts;
        } else {
            setPosts(null);
            return null;
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    let postItemsView;
    if (!loading && posts) {
        postItemsView = posts.map((item) => {
            if (columns === 4) {
                return (
                    <div className=" col-md-4 col-sm-6" key={item.id}>
                        <PostGrid post={item} />
                    </div>
                );
            } else {
                return (
                    <div className="col-md-6" key={item.id}>
                        <PostGrid post={item} />
                    </div>
                );
            }
        });
    }
    return (
        <div
            className={
                layout === 'left'
                    ? 'ps-blog--sidebar reverse'
                    : 'ps-blog--sidebar'
            }>
            <div className="ps-blog__left">
                <div className="row">{postItemsView}</div>
                <CustomPagination />
            </div>
            <div className="ps-blog__right">
                <WidgetBlogSearch />
                <WidgetBlogCategories />
                <WidgetBlogRecentPosts />
                <WidgetBlogRecentComments />
            </div>
        </div>
    );
};

export default BlogItemsSmallThumbView;
