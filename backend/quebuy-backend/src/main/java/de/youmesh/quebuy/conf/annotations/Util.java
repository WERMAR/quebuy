package de.youmesh.quebuy.conf.annotations;

import org.springframework.stereotype.Component;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


/**
 * {@link Util} is a Custom Annotation for Util-Classes like Date-Converter or similar Classes. It works like {@link org.springframework.stereotype.Service}-Annotation of Spring.
 * You can inject this class after adding the @Util-Annotation over the Spring Context.
 *
 * @see Target
 * @see Retention
 * @see Component
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Component
public @interface Util {

}
