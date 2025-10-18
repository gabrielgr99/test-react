import { apiClient } from "../client";
import { type TGetMovieByIdResponse } from "./types";

const getMovieById = async (movieId: string): Promise<TGetMovieByIdResponse> => (
	await apiClient.get(`/movie/${movieId}`)
).data;

export { getMovieById };
