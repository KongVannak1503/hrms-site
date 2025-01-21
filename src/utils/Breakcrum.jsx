import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="flex space-x-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {/* If it's the last item, don't make it a link */}
                        {index < items.length - 1 ? (
                            <>
                                <Link to={item.link} className="text-blue-500 hover:text-blue-700 dark:text-blue-400">
                                    {item.label}
                                </Link>
                                <span className="mx-2">/</span>
                            </>
                        ) : (
                            <span>{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
