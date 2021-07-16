import { useState, useEffect } from "react";
import { RepositoryItem } from "./RepositoryItem";

import "../styles/repositories.scss";
import useRepositories from "../hooks/useRepositories";

export function RepositoryList() {
    const [user, setUser] = useState("");
    const [page, setPage] = useState(0);
    const { repositories, fetchRepositories } = useRepositories(user);

    useEffect(() => {
        fetchRepositories(page);
    }, []);

    const handleSearch = (e: any) => {
        setUser(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("tamanho do repositorio =" + repositories.length);
        fetchRepositories(page);
    };

    return (
        <div>
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

                {/* paginação */}
                {/* <span>
                {Array(5)
                    .fill("")
                    .map((_, index) => {
                        return (
                            <button
                                key={index}
                                onClick={() => setPage(index + 1)}
                                disabled={index === page - 1}
                            >
                                {index + 1}
                            </button>
                        );
                    })}
            </span> */}

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
            </section>
        </div>
    );
}
