import { Subscription } from 'rxjs';

export function AutoUnsubscribe(target: any) {
  const originalNgOnDestroy = target.prototype.ngOnDestroy;

  target.prototype.ngOnDestroy = function () {
    // Appelle la fonction ngOnDestroy de la classe d'origine si elle existe
    if (originalNgOnDestroy && typeof originalNgOnDestroy === 'function') {
      originalNgOnDestroy.apply(this, arguments);
    }

    // Parcourt toutes les propriétés de la classe
    for (const prop in this) {
      if (this.hasOwnProperty(prop)) {
        const property = this[prop];

        // Vérifie si la propriété est un objet Subscription
        if (property instanceof Subscription) {
          property.unsubscribe(); // Désabonnement automatique
        }
      }
    }
  };
}
