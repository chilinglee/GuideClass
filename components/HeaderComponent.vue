<template>
  <div>
    <header>
      <div class="container-fluid fixed-top bg-white">
        <div class="container">
          <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
              <a class="navbar-brand fw-bold fs-4 brand-title" href="/"
                ><span class="text-primary">Guide</span>Class</a
              >
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav w-100">
                  <li class="nav-item me-auto">
                    <a
                      class="nav-link text-dark"
                      aria-current="page"
                      href="/teacher"
                      ><font-awesome-icon
                        icon="fas fa-chalkboard-user"
                        class="text-warning"
                      ></font-awesome-icon>
                      找老師</a
                    >
                  </li>
                  <div class="d-none d-lg-flex mx-3">
                    <p class="my-auto mx-2 text-secondary">
                      <font-awesome-icon
                        icon="fas fa-magnifying-glass"
                      ></font-awesome-icon>
                    </p>
                    <div class="dropdown">
                      <input
                        class="form-control nav-search bg-light"
                        type="search"
                        data-bs-toggle="dropdown"
                        placeholder="您想學習什麽？"
                        readonly="true"
                      />
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="/teacher?lang=eng"
                            >英語</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="/teacher?lang=jap"
                            >日語</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="/teacher?lang=kor"
                            >韓語</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="/teacher?lang=spa"
                            >西班牙語</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="/teacher?lang=dut"
                            >德語</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                  <li class="nav-item mx-3">
                    <a class="nav-link text-dark" href="/member/membership"
                      ><font-awesome-icon
                        icon="fas fa-circle-user"
                        class="text-primary"
                      ></font-awesome-icon>
                      會員中心</a
                    >
                  </li>
                  <a href="/login">
                    <button
                      class="btn btn-warning text-light mx-3"
                      type="button"
                    >
                      註冊/登入
                    </button></a
                  >
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  </div>
</template>
