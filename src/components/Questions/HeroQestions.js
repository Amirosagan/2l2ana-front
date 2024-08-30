const HeroQestion = () => {
    return (
        <div className="-mt-4 lg:-mt-28 lg:py-2"> 
            <section
                className="relative w-full lg:max-h-[100%] bg-[url(https://www.expatriatehealthcare.com/wp-content/uploads/2022/06/medical-g74306134e_1920.jpg)] bg-cover bg-center bg-no-repeat"
            >
                <div
                    className="absolute inset-0 bg-white/60 sm:bg-transparent sm:from-white/95 sm:to-primary/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
                ></div>
            
                <div
                    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
                >
                    <div className="max-w-xl text-center ltr:sm:text-left lg:mt-20 rtl:sm:text-right">
                        <h1 className="text-3xl font-extrabold sm:text-5xl">
                            ابعتي استشاراتك الطبية
                            <strong className="block font-extrabold text-primary"> واحنا نجاوبك </strong>
                        </h1>
                        <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                            لأن صحتك اهم حاجة عندنا ، وفرنالك فريق عمل متخصص للرد علي جميع استفساراتك الطبية
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4 text-center">
                            <a
                                href="/ask-Doctor"
                                className="block w-full rounded button bg-primary md:bg-accent px-12 py-3 text-sm font-medium text-white shadow  focus:outline-none focus:ring md:active:bg-accent active:bg-primary sm:w-auto"
                            >
                                ابعتي سؤالك
                            </a>
                            <a
                                href="/booking-Doctor"
                                className="block w-full rounded button bg-white px-12 py-3 text-sm font-medium text-primary shadow hover:text-teal-900 focus:outline-none focus:ring active:text-primary sm:w-auto"
                            >
                                احجزي مع دكتور
                            </a>
                        </div>
                    </div>
                 
                </div>
            </section>
        </div>
    );
}

export default HeroQestion;
