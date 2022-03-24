package de.youmesh.quebuy.util.converter;

public interface RestConverter<E, R> {

    public E toEntityObject(R data);
    public R toRestObject(E data);
}
