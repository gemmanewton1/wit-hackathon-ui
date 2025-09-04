package com.example.demo.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {
    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    // Pointcut for all public methods in repository package
    @Around("execution(public * com.example.demo.repository..*(..))")
    public Object logRepositoryMethods(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().toShortString();
        Object[] args = joinPoint.getArgs();
        logger.info("Entering method: {} with arguments: {}", methodName, args);
        try {
            Object result = joinPoint.proceed();
            logger.info("Exiting method: {} with result: {}", methodName, result);
            return result;
        } catch (Throwable ex) {
            logger.error("Exception in method: {}: {}", methodName, ex.getMessage());
            throw ex;
        }
    }
}

