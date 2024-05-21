import { EpisodeRepository } from "../repositories/episode-repository";
import { ShowRepository } from "../repositories/show-repository";

export interface ShowContext {
    showRepository: ShowRepository;
    episodeRepository: EpisodeRepository;
}