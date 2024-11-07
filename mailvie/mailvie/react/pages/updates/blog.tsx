import { PostItemImage } from "../../constants/images";

export function BlogList(){
    return (
       <div className="inner">
            <article className="post-card post-card-featured">
                <div className="post-card-featured-column">
                    <a href="">
                        <img className="post-card-image responsive-img" sizes="(min-width: 800px) 452px, 90vw" src={PostItemImage} alt="Introducing Hunter.io’s New Flexible Credit System For Yearly Plans" />
                    </a>
                </div>
                <div className="post-card-featured-column">
                    <div className="post-tags post-card-header-tags"><a href="">Product</a></div>
                    <h2>
                        <a href="">Introducing Hunter.io’s New Flexible Credit System For Yearly Plans</a>
                    </h2>
                    <p className="post-card-exerpt">
                        <a href="">We're excited to announce an update to Hunter.io’s pricing structure that's designed to provide more flexibility for our users subscribing to Yearly plans.</a>
                    </p>
                    <section className="post-meta post-card-meta">
                        <a href="">Giovanni Lepori</a>
                        <span className="bull">•</span>
                        <div className="post-date">14 May 2024 </div>
                    </section>
                </div>
            </article>
            <nav className="pagination"></nav>
        </div>
    )
}