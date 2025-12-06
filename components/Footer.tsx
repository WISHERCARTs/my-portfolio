const Footer = () => {
    return (
        <footer className="py-8 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                <p className="text-slate-600 dark:text-slate-400">
                    © {new Date().getFullYear()} Wish Nakthong. Built with Next.js & Tailwind CSS.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
