function Footer() {
    return (
        <footer className="bg-[#054D88] text-black py-1">
            <div className="container mx-auto">
                <div className="mx-8 lg:mx-3 flex flex-col gap-y-4 lg:flex-row items-center justify-between py-2 text-center ">
                    <div className="flex gap-x-3 flex-col items-center">
                        {/* <img
                className="h-10 w-1/2"
                src="../src/assets/logo.png"
                alt=""
              /> */}
                        <div className=" font-serif text-white ">
                            30 de agosto del 2024
                        </div>
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <div className="text-center lg:text-left text-white">
                            © 2024 LuisDev´s , All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;