export interface imgList {
  backdrops?: (BackdropsEntityOrPostersEntity)[] | null;
  id: number;
  logos?: (LogosEntity)[] | null;
  posters?: (BackdropsEntityOrPostersEntity)[] | null;
}
export interface BackdropsEntityOrPostersEntity {
  aspect_ratio: number;
  height: number;
  iso_639_1?: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
export interface LogosEntity {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface singlePageMovie {
  id: number;
  imdb_id: number;
  title: string;
  release_date: string;
  runtime: number;
  language: string;
  voteScore: number;
  description: string;
  posterUrl: string;
  genre: string[];
  tagline: string;
}

export interface setMovie {
  id: number;
  movieTitle: string;
  release_date: string;
  posterUrl: string;
  language: string;
  popularity: number;
  description: string;
  genreID: any[]
  voteScore: number;
  backdrop: string;
}

export interface MovieList {
  page: number;
  results: singleFromList[];
  total_pages: number;
  total_results: number;
}

export interface singleFromList {
  adult: boolean;
  backdrop_path: string;
  genre_ids: any[]
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: null;
  budget: number;
  genres?: GenresEntity[] | null;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: ProductionCompaniesEntity[] | null;
  production_countries?: ProductionCountriesEntity[] | null;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguagesEntity[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface GenresEntity {
  id: number;
  name: string;
}
export interface ProductionCompaniesEntity {
  id: number;
  logo_path?: string | null;
  name: string;
  origin_country: string;
}
export interface ProductionCountriesEntity {
  iso_3166_1: string;
  name: string;
}
export interface SpokenLanguagesEntity {
  english_name: string;
  iso_639_1: string;
  name: string;
}
