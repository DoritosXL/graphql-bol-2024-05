import DataLoader from 'dataloader';
import { ShowRepository } from '../repositories/show-repository';
import { GeneralShow } from '../entities/general-show';

export class ShowDataLoader {
	constructor(private showRepository: ShowRepository) {}

	loader = new DataLoader<number, GeneralShow>(async (ids) => {
		console.log('[dataloader] data loading for ids:', ids);

		return await this.showRepository.getShowsByIds(ids);
	}); // batcher

	async getShowById(id: number) {
		console.log('[dataloader] getShowById:', id);
		return await this.loader.load(id);
	}
}
