export default function TodoPage() {
    return (
        <>
            <header>
                <h1 className="text-3xl font-bold">
                    To Do 
                </h1>
            </header>

            {/* login form */}

            <section className="logi-form">
                <form>
                    <div className="form-group">
                        <label for="email"></label>
                        <input type="email"  id="email" />
                    </div>
                    <div className="form-group">
                        <label for="username"></label>
                        <input type="text"  id="username" />
                    </div>
                    <div className="form-group">
                        <label for="email"></label>
                        <input type="email"  id="email" />
                    </div>
                </form>
            </section>
        </>
    )
}