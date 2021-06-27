import { useState, useEffect } from "react";
import { RepositoryItem } from "./RepositoryItem";
import axios from "axios";

import "../styles/repositories.scss";

// https://api.github.com/users/martinigustavo

interface Repository {
    name: string;
    description: string;
    html_url: string;
}

export function RepositoryList() {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [user, setUser] = useState("");
    const [page, setPage] = useState(1);

    const totalNumPages = 1;

    useEffect(() => {
        function getFetchUrl() {
            return `https://api.github.com/users/${user}/repos?page=${page}`;
        }

        async function fetchData() {
            const result = await axios(getFetchUrl());
            setRepositories(result.data);
        }
    }, []);

    const handleSearch = (e: any) => {
        setUser(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        fetch(`https://api.github.com/users/${user}/repos?page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                setRepositories(data);
            });
    };

    const handleButtonState = () => {
        const btnNext = document.getElementById("next");
        const btnPrev = document.getElementById("previous");

        if (repositories.length < 30) {
            btnNext?.classList.add("disabled");
        } else {
            btnNext?.classList.remove("disabled");
        }

        if (page > 1) {
            btnPrev?.classList.remove("disabled");
        } else {
            btnPrev?.classList.add("disabled");
        }
    };

    const handleNextPage = (e: any) => {
        e.preventDefault();
        setPage(page + 1);
    };

    const handlePreviousPage = (e: any) => {
        e.preventDefault();
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <section className="repository-list">
            <form onSubmit={handleSubmit}>
                <legend>Informe o user do github: </legend>
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="Digite o user"
                    onChange={handleSearch}
                />
                <button type="submit">Buscar</button>
            </form>

            <h1>
                Lista de repositórios{" "}
                {repositories.length > 0
                    ? " (" + repositories.length + ")"
                    : "(0)"}
            </h1>

            <ul>
                {repositories.length > 0 ? (
                    repositories.map((repository) => (
                        <RepositoryItem
                            key={repository.name}
                            repository={repository}
                        />
                    ))
                ) : (
                    <p>Sem resultados.</p>
                )}
            </ul>

            <button
                onClick={handlePreviousPage}
                id="previous"
                className="disabled"
            >
                Anterior
            </button>
            <span>{page}</span>
            <button onClick={handleNextPage} id="next" className="disabled">
                Próxima
            </button>
        </section>
    );
}
