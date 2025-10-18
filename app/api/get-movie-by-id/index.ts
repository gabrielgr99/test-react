import { apiClient } from "../api-client";
import { type GetMovieByIdResponse } from "./types";

const getMovieById = async (movieId: string): Promise<GetMovieByIdResponse> => (
	await apiClient.get(`/movie/${movieId}`)
).data;

export { getMovieById };
