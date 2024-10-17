import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PokedexResponse, Pokemon, PokemonSpecies} from '../interfaces/pokedexResponse';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  private httpClient = inject(HttpClient)
  private api = `https://pokeapi.co/api/v2/`;

  getPokemonFromRegion(region = 'national'): Observable<PokedexResponse> {
    return this.httpClient.get<PokedexResponse>(`${this.api}/pokedex/${region}`);
  }

  searchForPokemonByName(name: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(`${this.api}/pokemon/${name}`);
  }

  searchForPokemonSpeciesByName(name: string): Observable<PokemonSpecies> {
    return this.httpClient.get<PokemonSpecies>(`${this.api}/pokemon-species/${name}`);
  }

  searchForPokemonById(id: number) {
    return this.httpClient.get(`${this.api}/pokemon/${id}`);
  }
}
