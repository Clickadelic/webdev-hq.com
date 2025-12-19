export default function testlogo(){
    return (
        <h1 className="text-2xl my-3 max-w-[180px]">
            <a href="/" className="group flex justify-between md:space-x-2 lg:space-x-4" title="WebDev HQ">
                <img src="./icons/extension/icon-128.png" className="group-hover:opacity-80" width="32" height="32" alt="WebDev HQ Logo" />
                <div className="font-light flex group-hover:text-slate-500" id="logo-text">
                    <span className="web">Web</span>
                    <span className="font-medium mr-2">Dev</span>
                    <span className="font-medium">HQ</span>
                </div>
            </a>
        </h1>
    )
}