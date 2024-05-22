import DataLoader from 'dataloader';
import { Show } from '../entities/show';
import { ShowRepository } from '../repositories/show-repository';

export class ShowDataLoader {
	constructor(private showRepository: ShowRepository) {}

	loader = new DataLoader<number, Show>(async (ids) => {
		console.log('[dataloader] data loading for ids:', ids);

		return await this.showRepository.getShowsByIds(ids);
	}); // batcher

	async getShowById(id: number) {
		console.log('[dataloader] getShowById:', id);
		return await this.loader.load(id);
	}
}
