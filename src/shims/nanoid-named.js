// src/shims/nanoid-named.js
import { nanoid as fn } from 'nanoid';

/*
 * – export par défaut  (pour les futurs imports default)
 * – export nommé       (React-Navigation :  import { nanoid } …)
 */
export default fn;
export const nanoid = fn;
